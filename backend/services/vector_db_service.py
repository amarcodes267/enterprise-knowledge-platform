import chromadb

client = chromadb.Client()

collection = client.get_or_create_collection(
    name="documents"
)

def store_embeddings(chunks, embeddings, filename):

    ids = []

    metadata = []

    for i in range(len(chunks)):
        ids.append(str(i))
        metadata.append({
            "filename": filename
        })

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadata
    )

    return "Embeddings stored successfully"