class Group < ApplicationRecord
  has_many :messages
  has_many :users, through: :group_users
  has_many :group_users

  validates :name, presence: true

  def show_last_message
    # if (last_message = messages.last).present?
    #   last_message.text? ? last_message.text : '画像が投稿されています'
    if messages.last.present?
      messages.last.text? ? messages.last.text : '画像が投稿されています'
    else
      'まだメッセージがありません'
    end
  end
end
