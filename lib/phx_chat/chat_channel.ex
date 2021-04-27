defmodule PhxChat.ChatChannel do
  use Ecto.Schema
  import Ecto.Changeset

  schema "chat_channels" do
    field :name, :string

    has_many :messages, PhxChat.Message

    timestamps()
  end

  @doc false
  def changeset(chat_channel, attrs) do
    chat_channel
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
