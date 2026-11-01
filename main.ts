import common from "@rivet-dev/agent-os-common";
import { AgentOs } from "@rivet-dev/agent-os-core";
import pi from "@rivet-dev/agent-os-pi";

const vm = await AgentOs.create({
  software: [common, pi],
});

try {
  const { sessionId } = await vm.createSession("pi", {
    env: {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    },
  });

  vm.onSessionEvent(sessionId, (event) => {
    console.log("[event]", event.method, event.params);
  });

  vm.onPermissionRequest(sessionId, (request) => {
    console.log("[permission]", request.description);
    vm.respondPermission(sessionId, request.permissionId, "once");
  });

  const response = await vm.prompt(
    sessionId,
    "Write a Python script that calculates pi",
  );

  // Log the full response object for debugging
  console.log("[response]", response);
  if (response && typeof response === "object") {
    if (response.text === "") {
      console.warn("[warn] Response text is empty. Full response:", JSON.stringify(response, null, 2));
    }
    if (response.response) {
      console.log("[response.response]", JSON.stringify(response.response, null, 2));
    }
    if (response.error) {
      console.error("[error]", response.error);
    }
  }

  vm.closeSession(sessionId);
} finally {
  await vm.dispose();
}