# create Users
users_list = [
  {
    email: 'workshop@devinterface.com',
    password: 'password'
  }
]

users_list.each do |x|
  User.create(
    email: x[:email],
    password: x[:password],
    password_confirmation: x[:password]
  )
end
  
  
# create Posts
posts_list = [
  {
    title: 'Post 1',
    slug: 'post-1',
    body: 'Body of Post 1'
  },
  {
    title: 'Post 2',
    slug: 'post-2',
    body: 'Body of Post 2'
  },
  {
    title: 'Post 3',
    slug: 'post-3',
    body: 'Body of Post 3'
  }
]

posts_list.each do |x|
  Post.create(
    title: x[:title],
    slug: x[:slug],
    body: x[:body]
  )
end