defmodule PhxChat.Repo.Migrations.Message do
  use Ecto.Migration

  def change do
    create table(:messages) do
      add :body, :string
      add :channel_id, :integer
      add :user_id, :integer
      timestamps()
    end
  end
end
