module.exports = {
  run: [
    // Install PyTorch with CUDA support first
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          xformers: false   // VoxCPM doesn't require xformers
        }
      }
    },
    // Install VoxCPM dependencies from requirements.txt
    {
      method: "shell.run",
      params: {
        venv: "env",
        message: [
          "pip install -r requirements.txt"
        ],
      }
    },
    // Pre-download VoxCPM1.5 model
    // Using && dir to ensure clean prompt termination
    {
      method: "shell.run",
      params: {
        venv: "env",
        message: [
          "huggingface-cli download openbmb/VoxCPM1.5 --local-dir-use-symlinks False && dir"
        ],
      }
    },
    // Optional: Pre-download enhancement models (ZipEnhancer and SenseVoice)
    {
      method: "shell.run",
      params: {
        venv: "env",
        message: [
          "python -c \"from modelscope import snapshot_download; snapshot_download('iic/speech_zipenhancer_ans_multiloss_16k_base'); snapshot_download('iic/SenseVoiceSmall')\" && dir"
        ],
      }
    },
    {
      method: "notify",
      params: {
        html: "Installation complete! Click 'Start' to launch VoxCPM."
      }
    }
  ]
}
