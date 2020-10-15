require 'byebug'

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
    @list = List.find_by_id(params[:list_id])

    if !@list
      @error = "List not found"
      render 'shared/error', status: :not_found
    else
      @card = @list.cards.build(card_params)

      if @card.save
        render :create, status: :created
      else
        @error = @card.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  rescue ActionController::ParameterMissing
    @error = "Invalid card data provided"
    render 'shared/error', status: :unprocessable_entity
  end

  def update
    @card = Card.find_by_id(params[:id])
    if !@card
      @error = "Card not found"
      render 'shared/error', status: :not_found
    end

    ActiveRecord::Base.transaction do
      @card.assign_attributes(card_params)
      create_action
      if @card.save
        render :update, status: :ok
      else
        @error = @card.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  end

  def destroy
    @card = Card.find_by_id(params[:id])

    if !@card
      @error = "Card not found"
      render 'shared/error', status: :not_found
    else
      if @card.destroy
        render :destroy, status: :ok
      else
        @error = @card.errors.full_messages.join(', ')
        render 'shared/error', status: :unprocessable_entity
      end
    end
  end

  private

  def create_action
    if @card.due_date_changed?
      if !@card.due_date
        @card.actions.create!(description: "Due date was removed")
      elsif @card.due_date_was
        @card.actions.create!(description: "Due date was changed to #{@card.due_date}.")
      else
        @card.actions.create!(description: "Due date was added.")
      end
    end

    if @card.archived_changed?
      if @card.archived_was
        @card.actions.create!(description: "Card was sent back to the board from the archive.")
      else
        @card.actions.create!(description: "Card was archived.")
      end
    end

    if @card.list_id_changed?
      @card.actions.create!(description: "Card was moved to a different list.")
    end

    # if @card.completed_changed?
    #   @card.actions.create!(description: "Completion status was changed.")
    # end
  end

  def card_params
    params.require(:card).permit(:title, :list_id, :description, :archived, :due_date, :completed, :labels => [])
  end
end