class ApiFailureApp < Devise::FailureApp
  def respond
    if attempted_path.to_s.start_with?("/api/")
      self.status = 401
      self.content_type = "application/json"
      self.response_body = { error: i18n_message }.to_json
    else
      super
    end
  end
end
