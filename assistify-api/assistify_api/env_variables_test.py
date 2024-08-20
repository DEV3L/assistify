from assistify_api.env_variables import ENV_VARIABLES, set_env_variables


def test_reset_env_variables(tmp_path):
    """
    Test the set_env_variables function to ensure it correctly sets environment variables
    from a .env file.

    Args:
        tmp_path: pytest fixture that provides a temporary directory unique to the test invocation.
    """
    # Create a temporary .env file with test environment variables
    env_file = tmp_path / ".env"
    env_file.write_text("MONGODB_URI=mongodb_uri\n")

    # Call the function to set environment variables from the .env file
    set_env_variables(str(env_file))

    # Assert the environment variables are set correctly in the ENV_VARIABLES instance
    assert ENV_VARIABLES.mongodb_uri == "mongodb_uri"