import { AgentOs } from "@rivet-dev/agent-os-core";
import common from "@rivet-dev/agent-os-common";
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

  console.log("[response]", response);

  vm.closeSession(sessionId);
} finally {
  await vm.dispose();
}