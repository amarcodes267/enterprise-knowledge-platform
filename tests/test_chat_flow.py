import sys
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from services.chat_service import chat_history
import app as app_module


class ChatFlowTests(unittest.TestCase):
    def setUp(self):
        self.client = app_module.app.test_client()
        chat_history.clear()

    def tearDown(self):
        chat_history.clear()

    def test_chat_returns_history_and_total_messages(self):
        with patch("routes.chat.search_documents", return_value=["Document context"]), patch(
            "routes.chat.generate_answer", return_value="Generated answer"
        ) as mock_generate_answer:
            response = self.client.post("/chat", json={"message": "Hello there"})

        self.assertEqual(response.status_code, 200)

        payload = response.get_json()
        self.assertEqual(payload["status"], "success")
        self.assertEqual(payload["answer"], "Generated answer")
        self.assertEqual(payload["total_messages"], 2)
        self.assertEqual(payload["history"][0]["role"], "user")
        self.assertEqual(payload["history"][1]["role"], "assistant")
        self.assertEqual(mock_generate_answer.call_args.args[0], "Hello there")


if __name__ == "__main__":
    unittest.main()
