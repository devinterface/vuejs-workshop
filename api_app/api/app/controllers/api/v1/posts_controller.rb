
module Api
  module V1
    # controller for Posts management
    class PostsController < SecuredController
      before_action :load_post, except: [:index]

      def index
        render json: Post.all, status: 200
      end

      def show
        load_post
        render json: post, status: 200
      end

      def create
        post.assign_attributes(post_params)

        if post.save
          render json: post, status: 200
        else
          render json: post.errors.details, status: 422
        end
      end

      def update
        if post.update_attributes(post_params)
          render json: post, status: 200
        else
          render json: post.errors.details, status: 422
        end
      end

      def destroy
        if post.destroy
          render json: {}, status: 200
        else
          render json: post.errors.details, status: 422
        end
      end

      private

      def post
        @post
      end

      def load_post
        @post = ['show', 'update', 'destroy'].include?(action_name) ? Post.find(params[:id]) : Post.new
      end

      def post_params
        unsafe_params[:post]
      end
    end
  end
end
