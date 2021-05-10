defmodule PhxChat.Repo.Migrations.AddUserIdToChatChannel do
  use Ecto.Migration

  def change do
    alter table("chat_channels") do
      add :user_id, :integer
    end

  end
end
