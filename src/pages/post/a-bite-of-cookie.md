---
title: A Bite of Cookie
date: 2021-10-29 23:30:00
tags:
  - Cookie
  - Http
---

最近在看 Ben Awad 在 Youtube 上的 [Typescirpt + GraphQL Fullstack](https://youtu.be/I6ypD7qv3Z8) 教程，其中用户认证是通过 Cookie 实现的。视频中开发时 `http://localhost:4000/graphql` 跳转的是 ApolloServerPlayground，而我学习此视频的时候已经是跳转到 ApolloStudio 了。所以导致在开发调试 login 接口时 Cookie 的表现上，有一些不一样。最后我不得不使用 ApolloServerPluginLandingPageGraphQLPlayground 这个插件去 fallback。Cookie 是个很难调试的玩意儿，其实没有必要在此大费周折，问题很可能是出现在你的调试工具上，所以只要保证客户端在调用的时候正常即可 😅。

## express-session cookie config {#express-session-cookie-config}

```ts
app.use(
  session({
    name: "qid",
    store: new RedisStore({
      client: redisClient,
      disableTTL: true,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10years
      httpOnly: true,
      secure: __prod__, // need https to set to true
      sameSite: "lax",
    },
    saveUninitialized: false,
    secret: "goodone",
    resave: false,
  })
);
```

选项：

- httpOnly: 设置 HTTP 响应头 [`Set-Cookie Http-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)，为 true 时，不允许客户端 JavaScript 改动 cookie。
- sameSite: 设置 HTTP 响应头 [`Set-Cookie SameSite`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 属性，最新的浏览器中，如果没有指定，默认为 `lax`

## Express 中 cors 的配置 {#cors-config-in-express}

使用 Apollo Server Playground 时，**不用设置 cors**，因为没有跨域 🤣。使用 Apollo Studio 时需要设置，但是[不起作用](https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920)，所以我才不得不切回 playground

```ts
const corsOptions: CorsOptions = {
  credentials: true,
};
```

选项：

- credentials: [Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials)

> The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to the frontend JavaScript code when the request's credentials mode (Request.credentials) is include.

当请求的 credentials 模式（Request.credential）为 `include` 模式时，_Access-Control-Allow-Credentials_ 响应头告诉浏览器是否要把 response 暴露给前端的 JavaScript 代码。

## 客户端中 Request.credentials 的配置 {#request-credential-in-client}

以 ApolloServerPlayground 为例：

```ts
// client settings
ApolloServerPluginLandingPageGraphQLPlayground({
  settings: {
    'request.credentials': 'include'
  }
}),
```

[Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials):

> The credentials read-only property of the Request interface indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests.

这里 Request interface 也作为 MDN 单独的一个[词条](https://developer.mozilla.org/en-US/docs/Web/API/Request)。简单来说，就是起请求时，在跨域的情况下，指示用户代理是否要发送来自其他 domain 的 cookie。

## Reference

- [How to debug cookies](https://github.com/benawad/how-to-debug-cookies/blob/master/README.md)
- [Apollo server landing page](https://www.apollographql.com/docs/apollo-server/api/plugin/landing-pages/)
- [Apollo Studio docs](https://www.apollographql.com/docs/studio/explorer/#connecting-to-your-server)
