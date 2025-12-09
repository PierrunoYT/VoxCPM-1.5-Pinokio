# VoxCPM Gradio UI

A comprehensive Gradio web interface for VoxCPM - Tokenizer-Free Text-to-Speech system.

## Features

- 🎵 **Basic Generation**: Simple text-to-speech synthesis
- 🎤 **Voice Cloning**: Zero-shot voice cloning with reference audio
- ⚙️ **Advanced Settings**: Fine-tune generation parameters
- ⚡ **Streaming Mode**: Real-time speech generation
- 🎛️ **Full Control**: Adjust CFG value, inference timesteps, and more

## Installation

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

Or install individually:

```bash
pip install voxcpm gradio soundfile numpy
```

### 2. Download Models (Optional)

The models will be downloaded automatically on first run, but you can pre-download them:

```python
from huggingface_hub import snapshot_download
snapshot_download("openbmb/VoxCPM1.5")
```

For the web demo features (optional):

```python
from modelscope import snapshot_download
snapshot_download('iic/speech_zipenhancer_ans_multiloss_16k_base')
snapshot_download('iic/SenseVoiceSmall')
```

## Usage

### Start the Gradio Interface

```bash
python gradio_app.py
```

The interface will be available at:
- Local: http://localhost:7860
- Network: http://0.0.0.0:7860

### Using the Interface

#### Tab 1: Basic Generation
1. Enter your text in the text box
2. Toggle "Text Normalization" based on your input type:
   - ✅ ON for regular text (numbers, punctuation)
   - ❌ OFF for phoneme input
3. Click "Generate Speech"

#### Tab 2: Voice Cloning
1. Enter the text you want to synthesize
2. Upload a reference audio file (the voice to clone)
3. Optionally provide the transcript of the reference audio
4. Toggle "Prompt Speech Enhancement":
   - ✅ ON for clean voice (16kHz limit)
   - ❌ OFF for high-quality cloning (up to 44.1kHz)
5. Click "Clone Voice"

#### Tab 3: Advanced Settings
1. Enter your text
2. Optionally upload reference audio
3. Adjust parameters:
   - **CFG Value** (0.5-5.0): Higher = better adherence to prompt
   - **Inference Timesteps** (5-50): Higher = better quality, slower
   - **Text Normalization**: Enable for regular text
   - **Denoise Output**: Enable for cleaner audio (16kHz limit)
   - **Retry Settings**: Configure automatic retry for unstable generation
4. Choose generation mode:
   - Click "Generate" for standard generation
   - Click "Generate (Streaming)" for streaming mode

## Tips for Best Results

### Text Input
- **Regular Text**: Keep "Text Normalization" ON
  - Example: "Hello, world! 123"
- **Phoneme Input**: Turn "Text Normalization" OFF
  - Example: `{HH AH0 L OW1}` (EN) or `{ni3}{hao3}` (ZH)

### Voice Cloning
- **Clean Voice**: Enable "Prompt Speech Enhancement" (16kHz)
- **High Quality**: Disable enhancement (up to 44.1kHz)
- Use clear, high-quality reference audio for best results

### Parameter Tuning
- **Short Sentences**: Increase CFG value (2.5-3.5)
- **Long Texts**: Lower CFG value (1.5-2.0)
- **Fast Draft**: Use 5-10 inference timesteps
- **High Quality**: Use 20-50 inference timesteps

## System Requirements

- **Python**: 3.8 or higher
- **GPU**: NVIDIA GPU recommended (RTX 4090 achieves RTF 0.17)
- **CUDA**: Required for GPU acceleration
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: ~5GB for models

## Troubleshooting

### Model Download Issues
If automatic download fails, manually download the model:
```python
from huggingface_hub import snapshot_download
snapshot_download("openbmb/VoxCPM1.5", cache_dir="./models")
```

### GPU Memory Issues
If you encounter out-of-memory errors:
- Reduce inference timesteps
- Process shorter text segments
- Use CPU mode (slower but works)

### Audio Quality Issues
- Ensure reference audio is high quality
- Disable "Prompt Speech Enhancement" for better quality
- Increase inference timesteps
- Adjust CFG value based on content

## License

Apache-2.0 License

## Important Notes

⚠️ **Responsible Use**: 
- Mark all AI-generated content appropriately
- Do not use for impersonation or fraud
- Respect individual rights and privacy
- For research and development purposes only

## Support

For issues and questions:
- VoxCPM GitHub: https://github.com/OpenBMB/VoxCPM
- Gradio Documentation: https://gradio.app/docs/

## Credits

- **VoxCPM**: OpenBMB/ModelBest
- **Gradio**: Gradio Team
- **Model**: VoxCPM1.5 (44.1kHz, 6.25Hz token rate)