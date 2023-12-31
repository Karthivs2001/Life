import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  loading = true;
  error = false;
  orders: Order[] = [];
  orderService: OrderService;
  displayedColumns: string[] = [
    '_id',
    'createdAt',
    'totalPrice',
    'isPaid',
    'isDelivered',
    'action',
  ];

  constructor(
    private titleService: Title,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    orderService: OrderService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.orderService = orderService;
  }

  ngOnInit() {
    this.getOrderHisoty();
  }

  private getOrderHisoty() {
    this.loading = true;
    this.orderService.getOrderHisoty().subscribe(
      (data) => {
        this.orders = data;

        this.titleService.setTitle(`Order History`);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.error = true;
        this.snackBar.open(err, '', { panelClass: 'error-snackbar' });
      }
    );
  }

 downloadReport(orderId: string) {
    this.orderService.downloadPurchaseReport(orderId).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `order-report-${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error downloading the report:', error);
      }
    );
  }

  cancelOrder(orderId: string) {
    this.orderService.cancelOrder(orderId).subscribe(
      () => {
        console.log('Order cancelled successfully');
        // Perform any additional actions after successful cancellation
        this.getOrderHisoty(); // Refresh the order history after cancellation
      },
      (error) => {
        console.error('Error cancelling the order:', error);
        this.snackBar.open('Error cancelling the order', '', { panelClass: 'error-snackbar' });
      }
    );
  }

}
