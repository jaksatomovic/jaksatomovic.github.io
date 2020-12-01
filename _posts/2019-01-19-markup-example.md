---
layout: post
title:  "Setup CI/CD with GitLab"
author: jaksa
categories: [ Jekyll, tutorial ]
image: assets/images/6.jpg
tags: [sticky,featured]
---

# Setup CI / CD with GitLab

How to register a GitLab runner and setup the CI/CD configuration file to create a build, package, deploy pipeline

In this post I’ll tell you how to setup a [CI/CD Environment](https://about.gitlab.com/product/continuous-integration/) with GitLab. The steps are explained using a Java [Spring Boot](http://spring.io/projects/spring-boot) Application.

Some instructions may vary depending on the technology and tools you use. Nevertheless the pattern stays the same for every CI / CD Environment: Build, test, package and deploy your code to staging / production systems. I’m gonna use Gradle to build & test my code and Docker to package & deploy it on my DigitalOcean server.

After this tutorial you will be able to automatically test and deploy your application by just pushing to your GitLab repository. Let’s have a look at what we’re building:

![This process will be triggered automatically when pushing to dev or master branch.](https://cdn-images-1.medium.com/max/6048/1*v-o0Jh4grlcwVj636QFomA.jpeg)*This process will be triggered automatically when pushing to dev or master branch.*

**Prerequisites:**

* A Linux Server with internet access and Docker [installed](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce)

* A GitLab Repository ([signup](https://gitlab.com/users/sign_in#register-pane) for free) with your Spring Boot Code checked in

**Steps:**

1. Configure GitLab Runner

1. Configure .gitlab-ci.yml

1. Create Dockerfile

## 1. Configure GitLab Runnner

If you work on the official [gitlab.com](https://gitlab.com) you can also make use of the [Shared Runners](https://about.gitlab.com/2016/04/05/shared-runners/) provided by GitLab and skip section 1. Nevertheless it’s worth thinking about configuring a custom GitLab Runner due to security reasons (because all commands in .gitlab-ci.yml will be executed on the runner, so you should be careful about sensitive data). Furthermore execution time is limited on GitLab’s Shared Runners.

GitLab [Runners](https://docs.gitlab.com/runner/) are designed to run your CI / CD Jobs. To make good use of CI / CD, the runner should always be up and running (otherwise Jobs won’t be processed). I have configured my Runner on a [DigitalOcean](https://www.digitalocean.com) Server. It’s up to you where you configure the runner, the only condition is to have internet access (the runner must communicate with GitLab).

Install the GitLab Runner according to these [instructions](https://docs.gitlab.com/runner/install/linux-repository.html#installing-the-runner).

Next we need to register the runner in order to connect it to our GitLab Project. On your GitLab Project go to Settings → CI / CD → Runners. You’ll need the URL and the token.

![](https://cdn-images-1.medium.com/max/2800/1*HHh22D6mQUU2B44ZoirAbg.png)

To register the runner, run this in your Server’s Shell (replace REGISTRATION_TOKEN with your token):

    sudo gitlab-runner register -n \    
    --url https://gitlab.com/ \    
    --registration-token REGISTRATION_TOKEN \    
    --executor docker \    
    --description "My Docker Runner" \    
    --docker-image "docker:stable" \    
    --docker-privileged

**It’s important to have the *docker-privileged* option since we want to use [docker in docker](https://docs.gitlab.com/ee/ci/docker/using_docker_build.html#use-docker-in-docker-executor) to package our app as a docker image.**

Your Runner should be up and running! Check your CI /CD Settings Page:

![Your runner should show up in your CI / CD Settings Page on GitLab](https://cdn-images-1.medium.com/max/2000/1*5VnX8x24L2gHVsyxpNjtUg.png)*Your runner should show up in your CI / CD Settings Page on GitLab*

## 2. Configure .gitlab-ci.yml

GitLab CI / CD works pretty simple: As soon as there is a [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/) file checked into your Repository, GitLab will run the Jobs configured in this file every time you make a commit. Common Jobs are test, build, deploy_staging or deploy_production. But it’s completely up to you, how you name a job and what you gonna do within the Job.

For now we want achieve the Following with GitLab CI / CD:

1. **Build:** Run Unit Tests and build .jar file

1. **Package:** Create and upload Docker Image into [GitLab Registry](https://docs.gitlab.com/ee/user/project/container_registry.html)

1. **Deploy_Prod:** Deploy a Docker Container to our Linux Server

This can be achieved by creating a .gitlab-ci.yml file in the project root of your Spring Boot Application with the following content:

``` java
    **image**: docker:latest
    **services**:
      - docker:dind
    
    **stages**:
      - build
      - package
      - deploy
    
    **build**:
      **image**: gradle:5.0-jdk8-alpine
      **stage**: build
      **script**:
        - gradle build
      **artifacts**:
        **paths**:
          - build/libs/*.jar
    
    **package**:
      **stage**: package
      **script**:
        - docker build -t registry.gitlab.com/mathflake/api .
        - docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
        - docker push registry.gitlab.com/mathflake/api
    
    **deploy_staging**:
      **stage**: deploy
      **script**:
        - apk upgrade && apk update
        - apk add openssh-client
        - apk add sshpass
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker pull registry.gitlab.com/mathflake/api
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER "docker container stop mathflake_api && docker container rm mathflake_api || true"
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker run --name mathflake_api -p 80:80 -d registry.gitlab.com/mathflake/api
      **environment**:
        **name**: staging
        **url**: https://mathflake.com
      **only**:
        - develop
```
Don’t get confused by deploy_staging section, it contains many variables and duplicate commands.** **Let’s break it into pieces for further explanation.

    **image**: docker:latest
    **services**:
      - docker:dind

**image:** Our GitLab Runner is configured to execute jobs using docker. This means a docker container will be created for every job, running all commands completely isolated from the OS. We tell the Executor to use the latest docker image from [Dockerhub](https://hub.docker.com/_/docker) as base image. This ensures that docker is installed within the docker container which might sound weird in the first place but is important for later packaging.

**services:** Since Docker was not built to run inside a docker container we need to add the [dind](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/) service.

    **stages**:
      - build
      - package
      - deploy

Stages define the order of job execution. They will be processed sequentially from top to bottom (build → package → deploy). Multiple jobs assigned to the same stage will be processed in parallel (e.g. if you want to build several .jars in different flavors).

    **build**:
      **image**: gradle:5.0-jdk8-alpine
      **stage**: build
      **script**:
        - gradle build
      **artifacts**:
        **paths**:
          - build/libs/*.jar

**build:** This is our first job called build.

**image:** Since we want to build with gradle we change the default image for this job to gradle:5.0-jdk8-alpine* *which comes with gradle preinstalled.

**stage:** The job will be assigned to the build stage which means it will run first.

**script:** The [script](https://docs.gitlab.com/ee/ci/yaml/#script) section lists all shell commands that should be executed within the docker container. By default you will be placed into a folder with your repository checked out on the same level (you can further investigate by running commands like *pwd* or *ls -la*). STDOUT of all commands will later appear on the job’s detail page on GitLab. We want to run the unit tests and build a .jar file which can be achieved by running **gradle build**.

**artifacts:** The [artifacts](https://docs.gitlab.com/ee/user/project/pipelines/job_artifacts.html) section tells GitLab which Files to keep persistent across all jobs. This allows us to access the generated .jar file within the next job. Furthermore you’ll be able to download Artifacts directly from your GitLab Projects:

![Download job artifacts from GitLab’s CI / CD Page](https://cdn-images-1.medium.com/max/4800/1*1cyUuMZiHyemdmqtNSlRWg.png)*Download job artifacts from GitLab’s CI / CD Page*

    **package**:
      **stage**: package
      **script**:
        - docker build -t registry.gitlab.com/mathflake/api .
        - docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
        - docker push registry.gitlab.com/mathflake/api

**package:** Another job called package.

**stage:** The job will be assigned to the package stage which means it runs secondly (after all *build* jobs successfully finished).

**script:** Few things going on here:

1. The first command will build a docker image called *registry.gitlab.com/mathflake/api*. The . at the end states that the [Dockerfile](https://docs.docker.com/engine/reference/builder/) (the recipe for building the image) is placed in the current directory. We haven’t created this file yet, this will be covered in part 3 but this file basically tells docker to package the app into a docker image.

1. The second command logs into the [GitLab Registry](https://docs.gitlab.com/ee/user/project/container_registry.html). GitLab Registry is a place within your GitLab Project that allows you to publish and store your Docker Images (you could also publish to the official [Docker Hub](https://hub.docker.com/)). In order to push our Docker Image to the registry we need to authenticate. Instead of putting our username and password directly into the *.gitlab-ci.yml* file, we make use of GitLab tokens. These tokens are generated and injected by GitLab for every job, granting us access to the registry for the time of job execution.

1. Lastly we push the Docker Image to the registry. If everything went well, the Image should show up in your Project’s Registry (Project Menu → Registry):

![](https://cdn-images-1.medium.com/max/4800/1*zoAKEf__wmjCvSRYeuXeZQ.png)

    **deploy_staging**:
      **stage**: deploy
      **script**:
        - apk upgrade && apk update
        - apk add openssh-client
        - apk add sshpass
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker pull registry.gitlab.com/mathflake/api
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER "docker container stop mathflake_api && docker container rm mathflake_api || true"
        - sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER docker run --name mathflake_api -p 80:80 -d registry.gitlab.com/mathflake/api
      **environment**:
        **name**: staging
        **url**: https://mathflake.com
      **only**:
        - develop

This is the last part which automatically deploys your application. It might look complex in the first place but it effectively is nothing more than stopping and starting a docker container on your server.

**stage:** The job will be assigned to the deploy stage which means it runs lastly (after all *other* jobs successfully finished).

(since script is the longest block, let’s start with the others)

**environment:** [Environments](https://docs.gitlab.com/ee/ci/environments.html) is a feature of GitLab. If you go to GitLab → Operations → Environments you will get an overview of all your environments, time of the last deployment and a direct link to your application (which was specified by the **url** tag). Feel free to add more deployment jobs to your *.gitlab-ci.yaml* if you have multiple environments (like test or production).

![](https://cdn-images-1.medium.com/max/4808/1*q_IboemOLPPVwUtFRNXm0A.png)

**only:** Tell GitLab to only run this job on commits to develop branch.

**script:** Here’s where the whole deployment takes place. Without beating about the bush; we install an ssh client and sshpass (line 1–3) in order to execute the deployment commands on our remote server (line 4–7). In this case it’s done via ssh password login on the remote server. If you have a look at lines 4–7 you’ll recognize they all have the same prefix which is

    sshpass -p "$STAGING_SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $STAGING_SERVER_USER@$STAGING_SERVER

The sshpass program, securely passes the password (-p) to the ssh program, which connects to your server and executed whatever command you append at the end of the line. You already know $CI_BUILD_TOKEN which is a variable provided by GitLab itself. But in this case we have our own variables, like $STAGING_SERVER_PASSWORD, $STAGING_SERVER_USER and $STAGING_SERVER. You have to specify the variable values on GitLab → Settings → CI / CD → Variables. GitLab will inject those variables as linux environment variables when running the job. *StrictHostKeyChecking=no* suppresses the question, whether you trust the remote server (which would break the automation line)

On a production system you’re likely to have turned off password login and only allow ssh key authentication, in this case you’d just have to deposit the ssh private key as a GitLab variable instead of the login password and slightly change the ssh connect string.

Read this response if you‘re interested in certificate authentication:
[**How to authenticate with a certificate**
*You want to authenticate with a certificate rather than password (which is highly recommended). You can do this with…*medium.com](https://medium.com/@mikenoethiger/hi-kshitij-bajracharya-glad-you-liked-it-32e745e02705)

The commands that are eventually responsible for the deployment are not very readable due to the ssh connect string overhead, so let’s extract what’s effectively executed on your server:

    - docker login -u gitlab-ci-token -p $CI_BUILD_TOKEN registry.gitlab.com
    - docker pull registry.gitlab.com/mathflake/api
    - docker container stop mathflake_api && docker container rm mathflake_api || true
    - docker run --name mathflake_api -p 80:80 -d

You already know the login procedure (line 1). Then we pull the latest image, that was previously pushed to the registry in package job (line 2). Then we stop and delete the current container (line 3). Docker would throw an error if we try to stop a container that’s not actually running, so we append *|| true* which suppresses error return codes from the shell. Last but not least we start a new container (line 4). Deployment done.

## 3. Create Dockerfile

We use Docker to run our application. To achieve that we need to package our application into a Docker Image (the procedure that we triggered during the GitLab **package** job with the *docker build* command). If you’re new to Docker, check out the official [Get Started](https://docs.docker.com/get-started/).

Docker Images are built by recipe files called [Dockerfile](https://docs.docker.com/engine/reference/builder/). Let’s create a Dockerfile in the root of your Repository with the following content:

    **FROM **openjdk:8-jdk-alpine
    **VOLUME /**tmp
    **COPY **build**/**libs**/***.jar app.jar
    **ENTRYPOINT **["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

Check out the [Spring Documentation](https://spring.io/guides/gs/spring-boot-docker/#_containerize_it) for more information on this Dockerfile. When building with docker, docker will copy the .jar file under build/libs into the docker image and name it **app.jar**. build/libs is the place where Gradle puts the built Application .jar file. The path of your .jar File may vary depending on how you build (for Maven I believe it’s /target). With **ENTRYPOINT** we specify the shell commands that shall get executed when running this docker image. Thanks to Spring Boot’s embedded Tomcat we start the app by simply running **java -jar app.jar**. Make sure you have an [Application class](https://spring.io/guides/gs/spring-boot/#_create_an_application_class) on your classpath.

## Conclusion

Let’s recap; following is going to happen when committing to develop branch on GitLab:

1. GitLab checks for a *.gitlab-ci.yml* file in your repository (which we have)

1. GitLab starts a docker container and checks out the repository to the container working directory

1. GitLab starts with the build job and proceeds with all commands. A *.jar* file will be generated and attached to the job (visible/downloadable at GitLab → CI / CD).

1. If the build job was successful, GitLab proceeds with the package job (the old docker container will be deleted and a fresh one will be created for this job). During this job, your application will be packaged into a docker image and pushed to the GitLab registry (here’s where the Dockerfile will be used which we created lastly).

1. If the package job was successful, GitLab proceeds with the deploy_staging job (again with a new container). The docker image previously pushed to the registry is being deployed to the staging server via ssh. Be aware, that those ssh commands will be executed within the docker container.

If there’s something missing in this article or you have questions or there’s any topic you’d like me to write about more (e.g. an article about docker only), please contact me at noethiger.mike@gmail.com.
