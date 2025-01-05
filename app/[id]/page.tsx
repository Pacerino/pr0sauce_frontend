"use client";

import { useParams, useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  item_id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  acr_id: string;
  provider: string;
  spotify_url: string;
  spotify_id: string;
  youtube_url: string;
  youtube_id: string;
}

const ITEM_QUERY = gql`
  query GetItem($id: Int!) {
    item(item_id: $id) {
      id
      item_id
      title
      artist
      album
      url
      acr_id
      provider
      spotify_url
      spotify_id
      youtube_url
      youtube_id
    }
  }
`;

export default function ItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const { loading, error, data } = useQuery(ITEM_QUERY, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id]);

  useEffect(() => {
    if (data && data.item[0]?.spotify_id) {
      fetch(`https://open.spotify.com/oembed?url=spotify:track:${data.item[0].spotify_id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error.message);
          }
          setCoverUrl(data.thumbnail_url);
        });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-161618">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-f2f5f4" role="status">
          </div>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-f2f5f4">Error: {error.message}</p>;
  if (!data || !data.item.length) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-161618">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-f2f5f4">Content Not Found</h1>
          <p className="text-lg text-f2f5f4">The content you requested could not be found.</p>
        </div>
      </div>
    );
  }

  const item: Item = data.item[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-161618">
      <div className="max-w-4xl w-full bg-2a2e31 shadow overflow-hidden sm:rounded-lg p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-700 px-4 py-5 sm:px-6 text-center">
            <h3 className="text-lg leading-6 font-medium text-f2f5f4">{item.title}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">{item.artist}</p>
            {coverUrl && (
              <div className="flex justify-center mt-4">
                <img src={coverUrl} alt={`${item.title} cover`} className="w-48 h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>
          <div className="col-span-2">
            <dl>
              <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">ID</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">{item.id}</dd>
              </div>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">Item ID</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">
                  <a href={`https://pr0gramm.com/new/${item.item_id}`} target="_blank" className="text-blue-500 hover:underline">
                    {item.item_id}
                  </a>
                </dd>
              </div>
              <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">Album</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">{item.album}</dd>
              </div>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">URL</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">
                  <a href={item.url} className="text-blue-500 hover:underline">
                    {item.url}
                  </a>
                </dd>
              </div>
              <div className="bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">Provider</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">{item.provider}</dd>
              </div>
              <div className="bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-400">Links</dt>
                <dd className="mt-1 text-sm text-f2f5f4 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-4">
                    {item.spotify_url && (
                      <a href={item.spotify_url} target="_blank" rel="noopener noreferrer">
                        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                          Open in Spotify
                        </button>
                      </a>
                    )}
                    {item.youtube_url && (
                      <a href={item.youtube_url} target="_blank" rel="noopener noreferrer">
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                          Open in YouTube
                        </button>
                      </a>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
