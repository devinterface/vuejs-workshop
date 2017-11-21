
module Api
  module V1
    # controller for Comments management
    class CommentsController < SecuredController
      before_action :load_post

      def create
        comment = Comment.new(comment_params)

        if comment.save
          render json: comment, status: 200
        else
          render json: comment.errors.details, status: 422
        end
      end

      def destroy
        comment = Comment.find(params[:id])
        if comment.destroy
          render json: {}, status: 200
        else
          render json: comment.errors.details, status: 422
        end
      end

      private

      def post
        @post
      end

      def load_post
        @post = Post.find(params[:post_id])
      end

      def comment_params
        res = unsafe_params[:comment]
        res[:user_id] = current_user.id
        res[:post_id] = post.id
        res
      end
    end
  end
end
