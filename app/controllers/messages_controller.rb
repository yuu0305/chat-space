class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
      respond_to do |format|
        format.html
        format.json{@new_message = Message.where('id > ?',params[:id])} # 新しいidがある時、代入（比較）

      end
  end

  def create

    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html{redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @groups.messages.includes(:user)
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
    @users=@group.users
  end
end
