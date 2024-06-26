import { useParams } from 'next/navigation';
import { parse, type ParsedUrlQuery } from 'querystring';
import { IS_PRODUCTION } from '@/config/constants';
import chains from '@/config/chains';
import { parsePrefixedAddress } from '@/utils/addresses';
import useChains from './useChains';
import { useWallet } from './useWallet';

const defaultChainId = IS_PRODUCTION ? chains.opt : chains.sep;

const getLocationQuery = (): ParsedUrlQuery => {
  if (typeof location === 'undefined') return {};
  const query = parse(location.search.slice(1));
  return query;
};

export const useUrlChainId = (): string | undefined => {
  const queryParams = useParams();
  const { configs } = useChains();

  const query =
    queryParams && (queryParams.safe || queryParams.chain)
      ? queryParams
      : getLocationQuery();
  const chain = query.chain?.toString() || '';
  const safe = query.safe?.toString() || '';

  const { prefix } = parsePrefixedAddress(safe);
  const shortName = prefix || chain;

  if (!shortName) return undefined;

  return (
    chains[shortName] ||
    configs.find((item) => item.shortName === shortName)?.chainId
  );
};

const useWalletChainId = (): string | undefined => {
  const { wallet } = useWallet();
  const walletChainId =
    wallet?.chainId && wallet.chainId.split(':')[1]
  return walletChainId;
};

export const useChainId = (): string => {
  const urlChainId = useUrlChainId();
  const walletChainId = useWalletChainId();

  return urlChainId || walletChainId || defaultChainId;
};

export default useChainId;
