import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import 'html-escaper';
import 'clsx';
import './chunks/astro_MetOjhLL.mjs';
import { compile } from 'path-to-regexp';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"","routes":[{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/canarin-garage","type":"page","pattern":"^\\/canarin-garage\\/?$","segments":[[{"content":"canarin-garage","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/canarin-garage.astro","pathname":"/canarin-garage","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/hardware","type":"page","pattern":"^\\/hardware\\/?$","segments":[[{"content":"hardware","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/hardware.astro","pathname":"/hardware","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/keero","type":"page","pattern":"^\\/keero\\/?$","segments":[[{"content":"keero","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/keero.astro","pathname":"/keero","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/apps","type":"page","pattern":"^\\/apps\\/?$","segments":[[{"content":"apps","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/apps/index.astro","pathname":"/apps","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.kPPQrZRG.js"}],"styles":[{"type":"external","src":"/_astro/index.bc1fPQTl.css"},{"type":"external","src":"/_astro/index.43XrdwBR.css"}],"routeData":{"route":"/apps/mako-writer","type":"page","pattern":"^\\/apps\\/mako-writer\\/?$","segments":[[{"content":"apps","dynamic":false,"spread":false}],[{"content":"mako-writer","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/apps/mako-writer.astro","pathname":"/apps/mako-writer","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://jaksatomovic.github.io","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/canarin-garage.astro",{"propagation":"none","containsHead":true}],["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/apps/index.astro",{"propagation":"none","containsHead":true}],["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/apps/mako-writer.astro",{"propagation":"none","containsHead":true}],["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/hardware.astro",{"propagation":"none","containsHead":true}],["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jaksatomovic/Workspace/keero/firmware/jaksatomovic.github.io/src/pages/keero.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/canarin-garage@_@astro":"pages/canarin-garage.astro.mjs","\u0000@astro-page:src/pages/hardware@_@astro":"pages/hardware.astro.mjs","\u0000@astro-page:src/pages/keero@_@astro":"pages/keero.astro.mjs","\u0000@astro-page:src/pages/apps/index@_@astro":"pages/apps.astro.mjs","\u0000@astro-page:src/pages/apps/mako-writer@_@astro":"pages/apps/mako-writer.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/keero.astro":"chunks/pages/keero_0B7w5QhZ.mjs","/src/pages/apps/mako-writer.astro":"chunks/pages/mako-writer_BXoXFoB6.mjs","\u0000@astrojs-manifest":"manifest_Zn5EWQc6.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.kPPQrZRG.js","astro:scripts/before-hydration.js":""},"assets":[]});

export { manifest };
