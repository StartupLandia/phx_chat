defmodule PhxChatWeb.SomeChatController do
  use PhxChatWeb, :controller

  def index(conn, _params) do
     render(conn, "index.html")
  end


  def foo(conn, _params) do
    fson = %{foo: 'bar'}
    render(conn, "foo.json", fson: fson)
  end

end
