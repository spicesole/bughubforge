import http from 'http';
import https from 'https';

class PerformanceMonitor {
  constructor(url, interval = 1000) {
    this.url = url;
    this.interval = interval;
    this.stats = {
      requests: 0,
      errors: 0,
      totalTime: 0,
      minTime: Infinity,
      maxTime: 0,
      startTime: Date.now(),
    };
  }

  async makeRequest() {
    return new Promise((resolve) => {
      const start = Date.now();
      const protocol = this.url.startsWith('https') ? https : http;

      const req = protocol.get(this.url, (res) => {
        const duration = Date.now() - start;
        this.updateStats(duration, res.statusCode === 200);
        resolve({ duration, status: res.statusCode });
      });

      req.on('error', (err) => {
        const duration = Date.now() - start;
        this.updateStats(duration, false);
        resolve({ duration, error: err.message });
      });

      req.setTimeout(5000, () => {
        req.destroy();
        const duration = Date.now() - start;
        this.updateStats(duration, false);
        resolve({ duration, error: 'Timeout' });
      });
    });
  }

  updateStats(duration, success) {
    this.stats.requests++;
    this.stats.totalTime += duration;

    if (success) {
      this.stats.minTime = Math.min(this.stats.minTime, duration);
      this.stats.maxTime = Math.max(this.stats.maxTime, duration);
    } else {
      this.stats.errors++;
    }
  }

  getStats() {
    const avgTime = this.stats.requests > 0 ? this.stats.totalTime / this.stats.requests : 0;
    const errorRate = this.stats.requests > 0 ? (this.stats.errors / this.stats.requests) * 100 : 0;
    const rps = (this.stats.requests / ((Date.now() - this.stats.startTime) / 1000)).toFixed(2);

    return {
      requests: this.stats.requests,
      errors: this.stats.errors,
      errorRate: `${errorRate.toFixed(2)}%`,
      avgResponseTime: `${avgTime.toFixed(2)}ms`,
      minResponseTime: this.stats.minTime === Infinity ? 'N/A' : `${this.stats.minTime}ms`,
      maxResponseTime: `${this.stats.maxTime}ms`,
      requestsPerSecond: rps,
    };
  }

  start() {
    console.log(`🚀 Starting performance monitor for ${this.url}`);
    console.log('Press Ctrl+C to stop\n');

    this.intervalId = setInterval(async () => {
      await this.makeRequest();
      const stats = this.getStats();

      console.clear();
      console.log('📊 Performance Monitor');
      console.log('=====================');
      console.log(`URL: ${this.url}`);
      console.log(`Total Requests: ${stats.requests}`);
      console.log(`Errors: ${stats.errors} (${stats.errorRate})`);
      console.log(`Avg Response Time: ${stats.avgResponseTime}`);
      console.log(`Min Response Time: ${stats.minResponseTime}`);
      console.log(`Max Response Time: ${stats.maxResponseTime}`);
      console.log(`Requests/Second: ${stats.requestsPerSecond}`);
      console.log(`\nRunning for: ${((Date.now() - this.stats.startTime) / 1000).toFixed(1)}s`);
    }, this.interval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      const finalStats = this.getStats();
      console.log('\n📈 Final Statistics:');
      console.log('==================');
      console.log(`Total Requests: ${finalStats.requests}`);
      console.log(`Total Errors: ${finalStats.errors}`);
      console.log(`Error Rate: ${finalStats.errorRate}`);
      console.log(`Average Response Time: ${finalStats.avgResponseTime}`);
      console.log(`Requests/Second: ${finalStats.requestsPerSecond}`);
    }
  }
}

// Если скрипт запущен напрямую
if (require.main === module) {
  const url = process.argv[2] || 'http://localhost:3000';
  const monitor = new PerformanceMonitor(url);

  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping monitor...');
    monitor.stop();
    process.exit(0);
  });

  monitor.start();
}

module.exports = PerformanceMonitor;
