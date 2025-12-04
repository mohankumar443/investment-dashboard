#!/usr/bin/env python3
import sys
sys.path.insert(0, '/Users/likhithadalapathi/Desktop/WorkSpace/investment-dashboard/backend')

from app.services.pdf_service import pdf_service

holdings = pdf_service.parse_pdf_holdings()

print(f"\nTotal holdings parsed: {len(holdings)}\n")
for h in holdings:
    print(f"{h['symbol']:6} | {h['name']:40} | Qty: {h['quantity']:8.2f} | Avg Cost: ${h['avg_cost']:8.2f} | {h['sector']}")
