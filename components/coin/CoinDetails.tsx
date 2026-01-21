import Link from "next/link";
import { ExternalLink, Globe, FileText } from "@/components/Icons";

interface CoinDetailsProps {
    coin: CoinDetailsData;
}

export default function CoinDetails({ coin }: CoinDetailsProps) {
    const homepage = coin.links.homepage.find((url) => url);
    const blockchain = coin.links.blockchain_site.find((url) => url);
    const reddit = coin.links.subreddit_url;

    return (
        <div className="details">
            <h4>ℹ️ About {coin.name}</h4>

            {/* Description */}
            {coin.description.en && (
                <div className="bg-dark-500 rounded-lg p-5 mb-4">
                    <p
                        className="text-sm text-purple-100 leading-relaxed line-clamp-4"
                        dangerouslySetInnerHTML={{
                            __html: coin.description.en.slice(0, 500) + (coin.description.en.length > 500 ? "..." : ""),
                        }}
                    />
                </div>
            )}

            {/* Links */}
            <ul className="details-grid">
                {homepage && (
                    <li>
                        <span className="label">Website</span>
                        <Link
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            <Globe className="size-4" />
                            <span className="truncate">{new URL(homepage).hostname}</span>
                            <ExternalLink className="size-3" />
                        </Link>
                    </li>
                )}

                {blockchain && (
                    <li>
                        <span className="label">Blockchain Explorer</span>
                        <Link
                            href={blockchain}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            <FileText className="size-4" />
                            <span className="truncate">{new URL(blockchain).hostname}</span>
                            <ExternalLink className="size-3" />
                        </Link>
                    </li>
                )}

                {reddit && (
                    <li>
                        <span className="label">Reddit</span>
                        <Link
                            href={reddit}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            <span>r/{reddit.split("/r/")[1]?.replace("/", "")}</span>
                            <ExternalLink className="size-3" />
                        </Link>
                    </li>
                )}

                {coin.asset_platform_id && (
                    <li>
                        <span className="label">Platform</span>
                        <span className="capitalize">{coin.asset_platform_id}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}
