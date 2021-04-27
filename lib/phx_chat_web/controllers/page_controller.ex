defmodule PhxChatWeb.PageController do
  use PhxChatWeb, :controller

  def index(conn, _params) do
    channels = PhxChat.Repo.all(PhxChat.ChatChannel)
    render(conn, "index.html", channels: channels)
  end
end
