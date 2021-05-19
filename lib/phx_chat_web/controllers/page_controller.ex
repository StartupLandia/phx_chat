defmodule PhxChatWeb.PageController do
  use PhxChatWeb, :controller

  def index(conn, _params) do
    channels = PhxChat.Repo.all(PhxChat.ChatChannel)
    users = PhxChat.Repo.all(PhxChat.User)
    render(conn, "index.html", channels: channels, users: users)
  end
end
