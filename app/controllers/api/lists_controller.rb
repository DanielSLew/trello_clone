require 'byebug'

class Api::ListsController < ApplicationController
  def create
    @board = Board.find_by_id(params[:board_id])

    if !@board 
      @error = "Invalid board data provided"
      render 'shared/error', status: :unprocessable_entity
    else
      @list = @board.lists.build(list_params)

      if @list.save
        render :create, status: :created
      else
        @error = @list.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  rescue ActionController::ParameterMissing
    @error = "Invalid list data provided"
    render 'shared/error', status: :unprocessable_entity
  end

  def update

  end

  private

  def list_params
    params.require(:list).permit(:title)
  end

  def set_board
    begin
      @board = Board.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      @board = nil
      @error = "Invalid board data provided"
      render 'shared/error', status: :unprocessable_entity
    end
  end
end