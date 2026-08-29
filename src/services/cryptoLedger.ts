import { BlockchainBlock } from '../types';

export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function generateBlockchainLedger(batchId: string, details: {
  product: string;
  supplier: string;
  factory: string;
  warehouse: string;
  distributor: string;
  retailer: string;
  temp: number;
}): Promise<BlockchainBlock[]> {
  const events = [
    {
      event_type: 'Produced' as const,
      entity: details.supplier,
      metadata: { raw_material: 'Grade-A Fresh Intake', initial_ph: 6.6, inspection: 'Batch-Certified' },
      timestamp: '2026-08-27T06:00:00Z',
    },
    {
      event_type: 'Tested' as const,
      entity: details.factory,
      metadata: { pathogen_screen: 'Negative (Salmonella/Listeria)', pasteurization_temp: '72°C for 15s' },
      timestamp: '2026-08-27T09:30:00Z',
    },
    {
      event_type: 'Stored' as const,
      entity: details.warehouse,
      metadata: { bay_id: 'Zone-C Cold Room 4', avg_temp: `${details.temp}°C`, humidity: '82%' },
      timestamp: '2026-08-27T14:15:00Z',
    },
    {
      event_type: 'Transported' as const,
      entity: 'Delhi Fleet Logistics (Reefer #DL-14-889)',
      metadata: { reefer_telemetry: 'Continuous Temp Logged', gps_route: 'Ring Road Corridor' },
      timestamp: '2026-08-28T02:00:00Z',
    },
    {
      event_type: 'Inspected' as const,
      entity: 'Food Safety Officer Delhi Dept',
      metadata: { rapid_strip_test: 'Clear', cold_chain_seal: 'Intact' },
      timestamp: '2026-08-28T07:45:00Z',
    },
    {
      event_type: 'Distributed' as const,
      entity: details.retailer,
      metadata: { shelf_placement: 'Dairy Chiller Unit 2', receiving_temp: `${details.temp + 0.5}°C` },
      timestamp: '2026-08-28T09:00:00Z',
    },
  ];

  let prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
  const blocks: BlockchainBlock[] = [];

  for (let i = 0; i < events.length; i++) {
    const ev = events[i];
    const eventId = `BLK-${batchId.slice(-4)}-00${i + 1}`;
    const payloadStr = JSON.stringify({ batchId, type: ev.event_type, entity: ev.entity, meta: ev.metadata, ts: ev.timestamp });
    const payloadHash = await sha256(payloadStr);
    const currentHash = await sha256(`${prevHash}:${payloadHash}:${ev.timestamp}`);

    blocks.push({
      event_id: eventId,
      batch_id: batchId,
      event_type: ev.event_type,
      timestamp: ev.timestamp,
      entity: ev.entity,
      payload_hash: payloadHash,
      previous_hash: prevHash,
      current_hash: currentHash,
      metadata: ev.metadata,
      isValid: true,
    });

    prevHash = currentHash;
  }

  return blocks;
}

export async function verifyBlockchainIntegrity(blocks: BlockchainBlock[]): Promise<{
  isValid: boolean;
  tamperedIndex?: number;
  message: string;
}> {
  if (!blocks || blocks.length === 0) {
    return { isValid: false, message: 'No blockchain events found to verify.' };
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    
    // Check previous hash link
    if (i > 0) {
      if (block.previous_hash !== blocks[i - 1].current_hash) {
        return {
          isValid: false,
          tamperedIndex: i,
          message: `Hash link broken at Event #${block.event_id}: previous_hash does not match block #${blocks[i - 1].event_id} current_hash.`,
        };
      }
    } else {
      if (block.previous_hash !== '0000000000000000000000000000000000000000000000000000000000000000') {
        return {
          isValid: false,
          tamperedIndex: 0,
          message: 'Genesis block previous_hash is invalid.',
        };
      }
    }

    // Verify current hash computation
    const recomputedHash = await sha256(`${block.previous_hash}:${block.payload_hash}:${block.timestamp}`);
    if (recomputedHash !== block.current_hash) {
      return {
        isValid: false,
        tamperedIndex: i,
        message: `Cryptographic mismatch in Event #${block.event_id}: computed SHA-256 does not match recorded block header.`,
      };
    }
  }

  return {
    isValid: true,
    message: 'Chain Integrity Verified. All 6 cryptographic SHA-256 block signatures match ledger history.',
  };
}
