"""
FlyRank Refresh Scout MVP Execution Runner
Executes the FlyRank Refresh Scout Agent end-to-end and outputs structured logs and results.
"""

import sys
import time
from pathlib import Path

# Add project root to sys.path
ROOT_DIR = Path(__file__).resolve().parents[2]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from work.ai_fluency_build_core.flyrank_refresh_scout_agent import FlyRankRefreshScoutAgent

def main():
    print("=" * 70)
    print("      FLYRANK REFRESH SCOUT AGENT — CHECKPOINT 1 MVP RUNNER")
    print("=" * 70)
    
    agent = FlyRankRefreshScoutAgent()
    top_candidates, queue_md = agent.run_pipeline(top_n=50)

    output_path = ROOT_DIR / "work" / "ai_fluency_build_core" / "outputs" / "refresh_scout_queue.md"
    
    print("\n" + "=" * 70)
    print("VERIFICATION SUMMARY:")
    print(f" - Candidate Items Processed & Ranked: {len(top_candidates)}")
    print(f" - Priority Distribution:")
    print(top_candidates["priority_level"].value_counts().to_string())
    print(f" - Reason Code Breakdown:")
    print(top_candidates["reason_code"].value_counts().to_string())
    print(f" - Output File Written: {output_path}")
    print("=" * 70)

if __name__ == "__main__":
    main()
