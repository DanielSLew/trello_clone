class Api::CommentsController < ApplicationController
  # def show
  #   begin
  #     @card = Card.find(params[:id])
  #     @board_id = @card.list.board_id
  #   rescue ActiveRecord::RecordNotFound
  #     @card = nil
  #     @error = "Invalid card data provided"
  #     render 'shared/error', status: :unprocessable_entity
  #   end
  # end

  def create
    @card = Card.find_by_id(params[:card_id])

    if !@card
      @error = "Card not found"
      render 'shared/error', status: :not_found
    else
      @comment = @card.comments.build(comment_params)

      if @comment.save
        render :create, status: :created
      else
        @error = @comment.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  rescue ActionController::ParameterMissing
    @error = "Invalid comment data provided"
    render 'shared/error', status: :unprocessable_entity
  end

  private

  def comment_params
    params.require(:comment).permit(:text)
  end
end