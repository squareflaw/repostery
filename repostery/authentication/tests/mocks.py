import requests

class MockResponse:
    """
    Replicate the requests.get() calls
    """

    def __init__(self, data, error=False):
        self.data = data
        self.raise_error = error

    def json(self):
        return self.data

    def raise_for_status(self):
        if self.raise_error:
            raise requests.exceptions.HTTPError
