require IEx
defmodule Mix.Tasks.Messages do
  @moduledoc "what what, this is how you get ants!"
  @shortdoc "Echoes arguments"

  use Mix.Task

  @impl Mix.Task
  def run(args) do
    user_id = Enum.at(args, 0)
    channel_id = Enum.at(args, -1)
    Mix.shell().info(channel_id)
  end
end
