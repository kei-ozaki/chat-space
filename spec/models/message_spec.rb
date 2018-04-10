require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it "is valid with a text" do
        message = build(:message, image: "")
        expect(message).to be_valid
      end

      it "is valid with a image" do
        message = build(:message, text: "")
        expect(message).to be_valid
      end

      it "is valid with a text, image" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without text and image" do
        message = build(:message, text:"", image:"")
        message.valid?
        expect(message.errors[:text]).to include("を入力してください")
      end

      it "is invalid without a user_id" do
        message = build(:message, user_id:"")
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end

      it "is invalid without a group_id" do
        message = build(:message, group_id:"")
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
    end
  end
end
