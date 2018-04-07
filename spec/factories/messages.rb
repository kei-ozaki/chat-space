FactoryGirl.define do
  factory :message do
    text      Faker::Lorem.sentence
    image     File.open("#{Rails.root}/spec/fixtures/picture.png")
    user
    group
  end
end
