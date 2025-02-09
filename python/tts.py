import sys
import os
from gtts import gTTS
import io
import soundfile as sf
from pydub import AudioSegment
from dotenv import load_dotenv

sys.path.append('./so-vits-svc')
sys.path.append('..')
from inference.infer_tool import RealTimeVC, Svc # type: ignore
import asyncio
import websockets

# Load environment variables from .env file
load_dotenv('rvc.env')

# Get the model path and config path from environment variables
model_path = os.getenv('MODEL_PATH')
config_path = os.getenv('CONFIG_PATH')

# Load the model
svc_model = Svc(model_path, config_path)
real_time_vc = RealTimeVC()

async def convert_voice(websocket, path):
    async for message in websocket:
        # Generate speech using gTTS
        tts = gTTS(text=message, lang='en', slow=False)
        tts_fp = io.BytesIO()
        tts.write_to_fp(tts_fp)
        tts_fp.seek(0)
        
        # Convert MP3 to WAV using pydub
        tts_fp_wav = io.BytesIO()
        audio_segment = AudioSegment.from_file(tts_fp, format="mp3")
        audio_segment.export(tts_fp_wav, format="wav")
        tts_fp_wav.seek(0)
        
        # Save the WAV data to a temporary file
        with open("temp.wav", "wb") as f:
            f.write(tts_fp_wav.read())
        
        # Open the WAV file and pass the file-like object to the process method
        with open("temp.wav", "rb") as wav_file:
            speaker_id = 0
            converted_audio = real_time_vc.process(svc_model, speaker_id, f_pitch_change=0, input_wav_path=wav_file)
        
        # Send the converted audio back to the client
        await websocket.send(converted_audio)

start_server = websockets.serve(convert_voice, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()