self.onmessage = async (event) => {
  const { settings, key, value, workspace_path, invoke } = event.data

  // Your code that you want to run in the worker
  settings[key] = value
  invoke("file:settings-save", {
    settings: JSON.stringify(settings),
    workspace_path,
  })

  // Terminate the worker after the task is completed
  self.close()
}
