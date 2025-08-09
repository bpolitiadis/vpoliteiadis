import { Buffer } from 'node:buffer';

type SpotifyImage = { url: string; width: number; height: number };
type SpotifyAlbum = {
  id: string;
  name: string;
  release_date: string;
  images: SpotifyImage[];
  external_urls?: { spotify?: string };
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAppAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && now < cachedToken.expiresAt) return cachedToken.value;

  const id = import.meta.env.SPOTIFY_CLIENT_ID;
  const secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error('Missing Spotify credentials. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.');
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to get Spotify access token: ${res.status} ${text}`);
  }

  const { access_token, expires_in } = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: access_token, expiresAt: now + Math.max(0, (expires_in - 60) * 1000) };
  return access_token;
}

export async function getArtistAlbums(artistId: string): Promise<SpotifyAlbum[]> {
  const token = await getAppAccessToken();
  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single,compilation&market=US&limit=50`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to fetch artist albums: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { items?: any[] };
  const byId = new Map<string, any>();
  for (const a of data.items ?? []) {
    if (!byId.has(a.id)) byId.set(a.id, a);
  }
  return Array.from(byId.values()).map((a) => ({
    id: a.id,
    name: a.name,
    release_date: a.release_date,
    images: a.images ?? [],
    external_urls: a.external_urls ?? {},
  }));
}


