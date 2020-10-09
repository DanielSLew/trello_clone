class Api::CardsController < ApplicationController
  def show
    begin
      @card = Card.find(params[:id])
      @board_id = @card.list.board_id
    rescue ActiveRecord::RecordNotFound
      @card = nil
      @error = "Invalid card data provided"
      render 'shared/error', status: :unprocessable_entity
    end
  end

  def create
  end

  private

  # def card_params
  #   params.require(:card).permit(:title)
  # end
end