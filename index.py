from twelvelabs import TwelveLabs
from twelvelabs.models.task import Task

# 1. Initialize the client
client = TwelveLabs(api_key="tlk_0SMW7D905AAK2E2YFQVK219X0ZHV")

# 2. Create an index
models = [
{
        "name": "pegasus1.2",
        "options": ["visual", "audio"]
    }
]
index = client.index.create(name="Hackthe6ix", models=models)
print(f"Index created: id={index.id}, name={index.name}")

# 3. Upload a video
task = client.task.create(index_id=index.id, url="https://www.youtube.com/watch?v=NfeSoCLtxxc")
print(f"Task id={task.id}, Video id={task.video_id}")

# 4. Monitor the indexing process
def on_task_update(task: Task):
    print(f"  Status={task.status}")
task.wait_for_done(sleep_interval=5, callback=on_task_update)
if task.status != "ready":
    raise RuntimeError(f"Indexing failed with status {task.status}")
print(f"The unique identifier of your video is {task.video_id}.")

# 5. Generate title, topics, and hashtags
gist = client.gist(video_id=task.video_id, types=["title", "topic", "hashtag"])

# 6. Process the results
print(f"Title={gist.title}\nTopics={gist.topics}\nHashtags={gist.hashtags}")
