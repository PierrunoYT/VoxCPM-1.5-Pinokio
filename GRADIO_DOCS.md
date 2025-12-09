# Gradio 6.0.1 Documentation

## Overview
Gradio is an open-source Python package that allows you to quickly build and share demos or web applications for your machine learning models, APIs, or any Python function without needing web development experience.

- **Library ID**: `/gradio-app/gradio`
- **Version**: 6.0.1
- **Code Snippets Available**: 2,392
- **Source Reputation**: High
- **Benchmark Score**: 83

---

## Installation

### Python Client
Install or upgrade the `gradio_client` package (requires Python 3.10 or higher):

```bash
pip install --upgrade gradio_client
```

### Main Gradio Package
Install or upgrade Gradio (recommended within a virtual environment):

```bash
pip install --upgrade gradio
```

### JavaScript Client
Install via npm (requires Node.js >=18.0.0):

```bash
npm i @gradio/client
```

### Quick Installation for Notebooks
```python
!pip install -q gradio
```

---

## Quick Start

### Verify Installation
```python
import gradio as gr

print(f"Gradio version: {gr.__version__}")

# Quick test
demo = gr.Interface(fn=lambda x: x, inputs="text", outputs="text")
demo.launch()
```

### Basic Hello World Interface
```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()
```

---

## Core Components

### Interface Class
The `gr.Interface` class is the fundamental way to create interactive demos. It requires:
- `fn`: The function to wrap
- `inputs`: Input component(s)
- `outputs`: Output component(s)

**Basic Example:**
```python
import gradio as gr

def greet(name):
    return "Hello " + name + "!"

iface = gr.Interface(fn=greet, inputs="text", outputs="text")
iface.launch()
```

### Customizing Components
Use actual component classes for fine-grained control:

```python
import gradio as gr

def greet(name, intensity):
    return "Hello " + name + "!" * intensity

iface = gr.Interface(
    fn=greet,
    inputs=["text", gr.Slider(minimum=1, maximum=10, step=1, label="Intensity")],
    outputs="text",
    title="Greeter Bot",
    description="Demonstrates a greeter bot with a customizable intensity slider."
)
iface.launch()
```

**Textbox Customization:**
```python
import gradio as gr

def slow_echo(message, history):
    return message

iface = gr.Interface(
    fn=slow_echo,
    inputs=gr.Textbox(lines=2, placeholder="Enter text here..."),
    outputs="text",
    title="Something cool",
    description="This demonstrates a basic Echo Bot with customization."
)
iface.launch()
```

---

## Blocks Interface

Blocks provide more flexibility for complex layouts and interactions.

### Component Properties Example
```python
import gradio as gr
from gradio.media import get_image

with gr.Blocks() as demo:
    a = gr.Number(value=5, minimum=0, maximum=10, label="Input A", info="Enter a number between 0 and 10")
    output_a = gr.JSON(label="Output", elem_id="output")
    
    with gr.Row():
        show_value_btn = gr.Button("Show Value")
        double_btn = gr.Button("Double Value and Maximum")
        reset_btn = gr.Button("Reset")

    def process_with_props(x: gr.Number):
        return {
            "value": x.value,
            "maximum": x.maximum,
            "minimum": x.minimum,
        }
    
    show_value_btn.click(process_with_props, a, output_a)

    def double_value_and_max(x: gr.Number):
        x.maximum *= 2
        x.value = (x.value or 0) * 2
        x.info = f"Enter a number between 0 and {x.maximum}"
        return x

    double_btn.click(double_value_and_max, a, a).then(
        process_with_props, a, output_a
    )

    def reset(x: gr.Number):
        x.maximum = 10
        x.value = 5
        x.info = "Enter a number between 0 and 10"
        return x

    reset_btn.click(reset, a, a).then(
        process_with_props, a, output_a
    )

if __name__ == "__main__":
    demo.launch()
```

### Group Component
Organize multiple interface elements into a collapsible group:

```python
with gr.Group():
    gr.Textbox(label="First")
    gr.Textbox(label="Last")
```

### 3D Model Interface
```python
import gradio as gr

with gr.Blocks() as demo:
    with gr.Row():
        with gr.Column():
            input_3d = gr.Model3D(label="Input Model3D")
        with gr.Column():
            output_3d = gr.Model3D(label="Output Model3D")
        with gr.Column():
            num_change = gr.Number(label="# Change Events", value=0)
            num_load = gr.Number(label="# Upload Events", value=0)
            num_clear = gr.Number(label="# Clear Events", value=0)
            clear_value = gr.Textbox(label="Clear Value", value="")
    
    input_3d.upload(lambda s, n: (s, n + 1), [input_3d, num_load], [output_3d, num_load])
    input_3d.change(lambda n: n + 1, num_change, num_change)
    input_3d.clear(lambda s, n: (s, n + 1), [input_3d, num_clear], [clear_value, num_clear])

if __name__ == "__main__":
    demo.launch()
```

---

## Media Utilities

### Get Sample Media Paths
```python
from gradio.media import get_audio, get_video, MEDIA_ROOT

audio_path = get_audio("cantina.wav")
video_path = get_video("world.mp4")
print(f"Audio path: {audio_path}")
print(f"Video path: {video_path}")
```

---

## Common Dependencies

### For Image Processing
```bash
pip install -q gradio Pillow
```

### For Numerical Operations
```bash
pip install -q gradio numpy
```

---

## Development

### Svelte Application Development
```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

---

## Key Features

1. **Easy to Use**: Create ML demos with just a few lines of Python code
2. **Flexible Components**: Wide range of input/output components (text, image, audio, video, 3D models, etc.)
3. **Blocks API**: Advanced layout control for complex interfaces
4. **Event Handling**: Rich event system for interactive applications
5. **Sharing**: Easy deployment and sharing of demos
6. **Client Libraries**: Python and JavaScript clients for programmatic access
7. **Component Properties**: Dynamic component manipulation and state management

---

## Server Configuration

By default, Gradio launches on `http://localhost:7860`

---

## Additional Resources

- **GitHub Repository**: https://github.com/gradio-app/gradio
- **Official Website**: https://gradio.app
- **Documentation**: https://www.gradio.app/docs

---

*Documentation retrieved via Context7 MCP Server for Gradio version 6.0.1*