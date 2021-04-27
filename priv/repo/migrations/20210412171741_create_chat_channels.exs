defmodule PhxChat.Repo.Migrations.CreateChatChannels do
  use Ecto.Migration

  def change do
    create table(:chat_channels) do
      add :name, :string

      timestamps()
    end

  end
end
