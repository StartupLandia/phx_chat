defmodule PhxChat.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias PhxChat.User


  schema "users" do
    field :name, :string
    has_many :messages, PhxChat.Message
    has_many :chat_channels, PhxChat.ChatChannel

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
