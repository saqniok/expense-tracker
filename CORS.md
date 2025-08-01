# What is CORS?
**CORS** is a security mechanism that is used by browsers to control interned requests. When the web page loaded from one domain (for example, 127.0.1:5500) tries to make a request to the resource on another domain (for example, Localhost: 5000), the browser performs **"Preflight Request"** (preliminary request) and checks whether it is allowed. 

**Backend should clearly indicate that it allows requests from this other domain.**

---

`builder.Services.AddCors(...)`

This is an expansion method that registers **CORS** services in Dependency Injection (DI) of your ASP.NET Core application container. This makes Middleware Cors accessible to use later.

---

`options.AddPolicy("AllowFrontend", ...)`

This method creates a new **CORS** policy and appropriates her name -`"AllowFrontend"`. You can have several policies for different frontends or scenarios.

---

`policy.WithOrigins("http://127.0.0.1:5500")`

This is the most important rule in politics. 

It indicates which sources (Origins) have the right to send requests to your API. In this case, this is allowed **ONLY** for a Frontened application, which works at `http://127.0.0.1:5500`

---
`.AllowAnyHeader()`

Allows all HTTP-settings (Headers), which can be sent by a Frontened application. This is often used for headlines like Content-Type or Authorization.

---

`.AllowAnyMethod()`

Allows all HTTP models (for example, Get, Post, PUT, DeLETE) that can be used in queries.

---
`var app = builder.Build();`

Creates WebApplication from WebApplicationBuilder. This is a standard step in Program.cs.

---

`app.UseCors("AllowFrontend");`

This causes **CORS Middleware** and adds it to the Pipeline request processing.

**NB!**: here we clearly indicate the name of the policy `("AllowFrontend")`, which we have identified earlier. It is at this stage that Middleware begins to check all incoming requests and allow them if they correspond to your policy.

The order in which you call `app.UseCors (...)` matters. Usually it is placed after `app.userouting ()` and in front of `app.useauthentication ()` and `app.useauthorization ()`.

---

````csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5500")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// app implimintation...

app.UseCors("AllowFrontend");
```