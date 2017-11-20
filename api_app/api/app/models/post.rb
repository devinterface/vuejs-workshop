# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :string
#  slug       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :title,
            :body,
            :slug,
            presence: true

  validates :slug,
            uniqueness: true,
            if: Proc.new { |x| x.present? }
end
