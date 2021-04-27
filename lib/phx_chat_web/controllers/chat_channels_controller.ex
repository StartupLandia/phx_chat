require IEx

defmodule PhxChatWeb.ChatChannelsController do
  use PhxChatWeb, :controller

  def show(conn, _params) do
    users = PhxChat.Repo.all PhxChat.User
    channel = PhxChat.Repo.get(PhxChat.ChatChannel, conn.params["id"]) |> PhxChat.Repo.preload([messages: :user])
    render(conn, "show.html", channel: channel, users: users)
  end
end
