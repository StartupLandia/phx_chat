# PhxChat

  - Install dependencies with `mix deps.get`
  - Create and migrate your database with `mix ecto.setup`
  - Install Node.js dependencies with `npm install` inside the `assets` directory
  - Start Phoenix endpoint with `mix phx.server`
  - [`localhost:4000`](http://localhost:4000) from browser.
  - Run a console and server in same process `iex -S mix phx.server`
  - Run just a console `iex -S mix`
  - reload code into console `recompile()` 


### Ecto

Basic ORM behaviors...

  - `mix phx.gen.schema User users name:string email:string bio:string number_of_pets:integer`
  - `mix ecto.migrate`
  - instantiate a new User validation, `PhxChat.User.changeset(%PhxChat.User{}, %{})`
  - after setting alias `Repo.insert(%User{email: "user1@example.com"})` 
  - to query said User `Repo.all(from u in User, select: u.email)`
  - more on ecto, https://hexdocs.pm/ecto/Ecto.html
  - it is something lix a hybrid of rails + django, more raw that active record (thats a good thing for learning sql)
  - to reset/clear a db, `mix ecto.reset`
  - `PhxChat.Repo.get PhxChat.ChatChannel, 1` to query for id 1 of X Class


### Gen Ideas

  - `|>` a pipe, use everything left of the pipe as inputs to everything right of the pipe like ` A |> List.order` means order list a
  - Context - a collection of module, files code all related to some kind of domain object, lots of generators to make thse
  - `Telemetry` - a complex, customizable way to instrument and measure anything inside a phx app (seems very useful), basics already in use in Phx, using it more deeploy requires a use case
  - Presence a useful tool that allows aggregation of data about who/what is connected to sockets, channels



### Useful Tasks

- general phx tasks
```
johnd@MacBook-Air phx_chat %  mix help --search "phx"                          master
mix local.phx        # Updates the Phoenix project generator locally
mix phx              # Prints Phoenix help information
mix phx.digest       # Digests and compresses static files
mix phx.digest.clean # Removes old versions of static assets.
mix phx.gen.cert     # Generates a self-signed certificate for HTTPS testing
mix phx.gen.channel  # Generates a Phoenix channel
mix phx.gen.context  # Generates a context with functions around an Ecto schema
mix phx.gen.embedded # Generates an embedded Ecto schema file
mix phx.gen.html     # Generates controller, views, and context for an HTML resource
mix phx.gen.json     # Generates controller, views, and context for a JSON resource
mix phx.gen.live     # Generates LiveView, templates, and context for a resource
mix phx.gen.presence # Generates a Presence tracker
mix phx.gen.schema   # Generates an Ecto schema and migration file
mix phx.gen.secret   # Generates a secret
mix phx.new          # Creates a new Phoenix v1.5.7 application
mix phx.new.ecto     # Creates a new Ecto project within an umbrella project
mix phx.new.web      # Creates a new Phoenix web project within an umbrella project
mix phx.routes       # Prints all routes
mix phx.server       # Starts applications and their servers
```

- general ecto tasks

```
mix help --search 'ecto'                         master
mix ecto               # Prints Ecto help information
mix ecto.create        # Creates the repository storage
mix ecto.drop          # Drops the repository storage
mix ecto.dump          # Dumps the repository database structure
mix ecto.gen.migration # Generates a new migration for the repo
mix ecto.gen.repo      # Generates a new repository
mix ecto.load          # Loads previously dumped database structure
mix ecto.migrate       # Runs the repository migrations
mix ecto.migrations    # Displays the repository migration status
mix ecto.reset         # Alias defined in mix.exs
mix ecto.rollback      # Rolls back the repository migrations
mix ecto.setup         # Alias defined in mix.exs
mix phx.new.ecto       # Creates a new Ecto project within an umbrella project
```

## Resources

  - [deployment guides](https://hexdocs.pm/phoenix/deployment.html)
  - Official website: https://www.phoenixframework.org/
  - Guides: https://hexdocs.pm/phoenix/overview.html
  - Docs: https://hexdocs.pm/phoenix
  - Forum: https://elixirforum.com/c/phoenix-forum
  - Source: https://github.com/phoenixframework/phoenix


### Quirks

- if an object belongs to another object, you can't use that other object's id directly, ie messages belongs_to User cant directly use user_id in the schema?
