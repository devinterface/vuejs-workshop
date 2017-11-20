
module Api
  module V1
    # controller for Posts management
    class PostsController < SecuredController
      def index
        render json: { list: [0,1, 2, 3] }, status: 200
      end
    end
  end
end
