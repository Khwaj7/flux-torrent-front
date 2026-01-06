import { Torrent } from "../../types"

interface Props {
    torrent: Torrent;
}

export const DetailDescription = (props: Props) => {
    const { torrent } = props;
    return (
        <div
            className="bg-black/40 rounded-2xl p-6 font-mono text-sm leading-relaxed text-gray-300 border border-white/10 overflow-y-auto max-h-[400px]">
            <p className="text-[var(--primary-accent)] mb-2">General Information</p>
            <p>===================</p>
            <p>Title: {torrent?.name}</p>
            <p>Format: {torrent?.format}</p>
            <p>Resolution: {torrent?.resolution}</p>
            <br />
            <p className="text-[var(--primary-accent)] mb-2">Plot / Synopsis</p>
            <p>===================</p>
            <p>{torrent?.description}</p>
        </div>
    )
}