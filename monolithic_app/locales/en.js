module.exports = {
  errors: require('./en/errors.js'),
  models: require('./en/models.js'),
  attributes: require('./en/attributes.js'),

  sign_up: {
    title: 'Sign up',
    submit_label: 'Sign up'
  },
  sign_in: {
    title: 'Sign in',
    submit_label: 'Sign in'
  },
  forgot_password: {
    title: 'Forgot Password?',
    submit_label: 'Reset Password',
    email_not_present: 'Email address %{email} is not associated to any account',
    email_sent: 'An email have been sent to given address with further instructions',
    mail: {
      title: 'Password change request',
      heading: 'You are receiving this email because you have requested to modify the password for your account',
      link_text: "Please click the following link or copy and paste on your browser's address bar to modify your password",
      ignore_if_not_requested: "If you don't have requested to change your password, please ignore this email and your password will remain unchanged"
    }
  },
  reset_password: {
    title: 'Reset Password',
    modified: {
      title: 'Password successfully modified',
      text: 'You Password have been successfully modified'
    },
    mail: {
      title: 'Password successfully modified',
      text: 'You Password have been successfully modified'
    }
  },
  sign_out: {
    title: 'Logout'
  }

}
