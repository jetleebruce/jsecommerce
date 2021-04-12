const layout = require("../layout");

const getError = (errors, prop) => {
  //prop === 'email' || 'password' || 'passwordconfiramtion'

  try {
    return errors.mapped()[prop].msg;
    //   email: {
    //     msg: 'Invalid Email'
    //   },
    //   password:{msg: 'Password too short' },
    //   passwordConfirmation:{msg: 'Password must match'}
    // }
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
  You id is ${req.session.userId}
  <form method="POST">
  <input name="email" placeholder="email">
  ${getError(errors, "email")}
  <input name="password" placeholder="password">
  ${getError(errors, "password")}
  <input name="passwordConfirmation" placeholder="password confirmation">
  ${getError(errors, "passwordConfirmation")}
  <button>Sign Up</button>
  </form>
  </div>
    `,
  });
};
