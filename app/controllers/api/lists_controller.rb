class Api::ListsController < ApplicationController
  def create
    @board = Board.find_by_id(params[:board_id])

    if !@board 
      @error = "Board not found"
      render 'shared/error', status: :not_found
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
    @list = List.find_by_id(params[:id])

    if !@list
      @error = "List not found"
      render 'shared/error', status: :not_found
    else
      if @list.update(title: params[:title])
        render :create, status: :ok
      else
        @error = @list.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end
end